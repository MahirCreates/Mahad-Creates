
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, type PortfolioProject } from '@/lib/supabase';
import { handleSupabaseError } from '@/lib/errorHandler';
import { useToast } from '@/hooks/use-toast';

export const usePortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const defaultProjects = [
    {
      id: '1',
      project_id: 'project1',
      title: 'Somali Business E-commerce',
      description: 'Complete online store with payment integration and inventory management for local Somali business.',
      category: 'Web Development',
      image_url: 'https://ik.imagekit.io/weedadeveloper/1.Somali_Business_EcommercePrompt_GENERATEA_modern_Soma_3.jpg',
      order_index: 1,
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      project_id: 'project2',
      title: 'Logistics App UI/UX',
      description: 'Modern logistics tracking application with real-time updates and user-friendly interface.',
      category: 'App Development',
      image_url: 'https://ik.imagekit.io/weedadeveloper/2.Logistics_App_UIUXPrompt_GENERATEMobilefirst_logistic_2.jpg?updatedAt=1757367865124',
      order_index: 2,
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      project_id: 'project3',
      title: 'AI Chatbot for Customer Support',
      description: 'Intelligent customer service bot with multilingual support for Somali businesses.',
      category: 'AI Solutions',
      image_url: 'https://ik.imagekit.io/weedadeveloper/3.AI_chatbot_interface_on_smartphone_in_Somali_language_3.jpg?updatedAt=1757367865117',
      order_index: 3,
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      project_id: 'project4',
      title: 'Video Ad Campaign',
      description: 'Commercial video production featuring Mahad as actor for local business promotion.',
      category: 'Video Production',
      image_url: 'https://ik.imagekit.io/weedadeveloper/From%20Concept%20to%20commercial%20We%20Create%20it%20All%20(1).png?updatedAt=1757367870500',
      order_index: 4,
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      project_id: 'project5',
      title: 'Diaspora Marketing Campaign',
      description: 'Comprehensive digital marketing strategy targeting Somali diaspora communities.',
      category: 'Digital Marketing',
      image_url: 'https://ik.imagekit.io/weedadeveloper/5.A_digital_marketing_dashboard_with_Somali_diaspora_ca_1.jpg?updatedAt=1757367866117',
      order_index: 5,
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      project_id: 'project6',
      title: 'Online Course Platform',
      description: 'Educational platform with course management, student tracking, and payment integration.',
      category: 'Web Development',
      image_url: 'https://ik.imagekit.io/weedadeveloper/6.%20ONLINE%20EDU%20WEBopenart-image_-bDL288Z_1752522768193_raw.jpg?updatedAt=1757367862933',
      order_index: 6,
      updated_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      if (!isSupabaseConfigured) {
        // Use default projects when Supabase is not configured
        setProjects(defaultProjects);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index');

      if (error) throw error;

      if (data && data.length === 0) {
        // Initialize with default projects
        const { data: newProjects, error: insertError } = await supabase
          .from('portfolio_projects')
          .insert(defaultProjects.map(p => ({ 
            project_id: p.project_id,
            title: p.title,
            description: p.description,
            category: p.category,
            image_url: p.image_url,
            order_index: p.order_index
          })))
          .select();

        if (insertError) throw insertError;
        setProjects(newProjects || []);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      const supabaseError = handleSupabaseError(error);
      console.error('Error fetching projects:', supabaseError);
      
      toast({
        title: "Connect to Supabase",
        description: "To save your portfolio images permanently, please connect to Supabase."
      });
      
      // Fallback to default projects
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<PortfolioProject>) => {
    try {
      if (!isSupabaseConfigured) {
        // Update local state only
        setProjects(prev => prev.map(p => 
          p.project_id === projectId ? { ...p, ...updates } : p
        ));
        toast({
          title: "Temporary update",
          description: "Changes are temporary. Connect to Supabase to save permanently."
        });
        return;
      }

      const { data, error } = await supabase
        .from('portfolio_projects')
        .update(updates)
        .eq('project_id', projectId)
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => prev.map(p => p.project_id === projectId ? data : p));
      
      toast({
        title: "Project updated",
        description: "Your changes have been saved."
      });
    } catch (error) {
      const supabaseError = handleSupabaseError(error);
      console.error('Error updating project:', supabaseError);
      
      toast({
        title: "Update failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { projects, loading, updateProject, refetch: fetchProjects };
};
