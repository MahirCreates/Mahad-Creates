
import { useState, useEffect } from 'react';
import { supabase, type PortfolioProject } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const usePortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const defaultProjects = [
    {
      project_id: 'project1',
      title: 'Somali Business E-commerce',
      description: 'Complete online store with payment integration and inventory management for local Somali business.',
      category: 'Web Development',
      order_index: 1
    },
    {
      project_id: 'project2',
      title: 'Logistics App UI/UX',
      description: 'Modern logistics tracking application with real-time updates and user-friendly interface.',
      category: 'App Development',
      order_index: 2
    },
    {
      project_id: 'project3',
      title: 'AI Chatbot for Customer Support',
      description: 'Intelligent customer service bot with multilingual support for Somali businesses.',
      category: 'AI Solutions',
      order_index: 3
    },
    {
      project_id: 'project4',
      title: 'Video Ad Campaign',
      description: 'Commercial video production featuring Mahad as actor for local business promotion.',
      category: 'Video Production',
      order_index: 4
    },
    {
      project_id: 'project5',
      title: 'Diaspora Marketing Campaign',
      description: 'Comprehensive digital marketing strategy targeting Somali diaspora communities.',
      category: 'Digital Marketing',
      order_index: 5
    },
    {
      project_id: 'project6',
      title: 'Online Course Platform',
      description: 'Educational platform with course management, student tracking, and payment integration.',
      category: 'Web Development',
      order_index: 6
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index');

      if (error) throw error;

      if (data.length === 0) {
        // Initialize with default projects
        const { data: newProjects, error: insertError } = await supabase
          .from('portfolio_projects')
          .insert(defaultProjects.map(p => ({ ...p, image_url: null })))
          .select();

        if (insertError) throw insertError;
        setProjects(newProjects || []);
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error loading portfolio",
        description: "Using default configuration."
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId: string, updates: Partial<PortfolioProject>) => {
    try {
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
      console.error('Error updating project:', error);
      toast({
        title: "Update failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { projects, loading, updateProject, refetch: fetchProjects };
};
