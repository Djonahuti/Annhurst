'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { 
  Bus, 
  Users, 
  FileText, 
  TrendingUp, 
  Plus,
  Edit,
  Eye,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSupabase } from '@/contexts/SupabaseContext';

interface DashboardStats {
  totalPages: number
  publishedPages: number
  totalUsers: number
  totalRevenue: number
  totalBuses?: number
}

export default function AdminDashboard() {
  const { supabase } = useSupabase();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalBuses: 0
  })
  const [recentPages, setRecentPages] = useState<Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    lastModified: string;
    views: number;
  }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      // Fetch total pages and published pages
      const { data: pages } = await supabase
        .from('pages')
        .select('id, is_published, updated_at, title, slug')
        .order('updated_at', { ascending: false });
      // Fetch total users
      const { data: users } = await supabase
        .from('users')
        .select('id');
      // Fetch total revenue (sum of payment.amount)
      const { data: revenueData } = await supabase
        .from('payment')
        .select('amount');
      // Fetch total buses
      const { data: buses } = await supabase
        .from('buses')
        .select('id');

      let totalRevenue = 0;
      if (revenueData && Array.isArray(revenueData)) {
        totalRevenue = revenueData.reduce((sum, p) => sum + (p.amount || 0), 0);
      }

      setStats({
        totalPages: pages ? pages.length : 0,
        publishedPages: pages ? pages.filter((p) => p.is_published).length : 0,
        totalUsers: users ? users.length : 0,
        totalBuses: buses ? buses.length : 0,
        totalRevenue,
      });

      setRecentPages(
        (pages || [])
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            status: p.is_published ? 'published' : 'draft',
            lastModified: p.updated_at ? p.updated_at.split('T')[0] : '',
            views: 0 // No views column in schema
          }))
      );
      setIsLoading(false);
    };
    fetchStats();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to the Annhurst Transport admin dashboard. Manage your website content and monitor performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPages}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPages} published
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <span className="h-4 w-4 text-muted-foreground">₦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBuses}</div>
            <p className="text-xs text-muted-foreground">
              +3 this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/pages">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  <span>New Page</span>
                </Button>
              </Link>
              <Link href="/admin/pages">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Edit className="h-6 w-6 mb-2" />
                  <span>Edit Pages</span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/users">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Manage Users</span>
              </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New page published</p>
                  <p className="text-xs text-gray-500">Services page went live</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Page updated</p>
                  <p className="text-xs text-gray-500">About page content modified</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">Admin account created</p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Pages */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Pages</CardTitle>
              <CardDescription>
                Latest pages and their status
              </CardDescription>
            </div>
            <Link href="/admin/pages">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                   variant={page.status === 'published' ? 'default' : 'secondary'}
                   className='text-gray-200'
                  >
                    {page.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {page.lastModified}
                    </p>
                    <p className="text-xs text-gray-400">
                      {page.views} views
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 