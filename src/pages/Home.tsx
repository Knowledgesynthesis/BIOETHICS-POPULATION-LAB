import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { useAppStore } from '@/store/useAppStore';
import {
  BarChart3,
  FlaskConical,
  Heart,
  Shield,
  Lock,
  Users,
  FileText,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

const modules = [
  {
    id: 'stats',
    title: 'Stats Lab',
    description: 'Master diagnostic test characteristics and epidemiologic metrics',
    icon: BarChart3,
    color: 'text-blue-500',
    to: '/stats',
  },
  {
    id: 'study-design',
    title: 'Study Design',
    description: 'Build and analyze clinical research studies',
    icon: FlaskConical,
    color: 'text-purple-500',
    to: '/study-design',
  },
  {
    id: 'ethics',
    title: 'Ethics Navigator',
    description: 'Navigate complex medical ethics scenarios',
    icon: Heart,
    color: 'text-red-500',
    to: '/ethics',
  },
  {
    id: 'safety',
    title: 'Safety Lab',
    description: 'Understand medical errors and quality improvement',
    icon: Shield,
    color: 'text-green-500',
    to: '/safety',
  },
  {
    id: 'hipaa',
    title: 'HIPAA Challenge',
    description: 'Learn privacy and confidentiality rules',
    icon: Lock,
    color: 'text-yellow-500',
    to: '/hipaa',
  },
  {
    id: 'public-health',
    title: 'Public Health',
    description: 'Simulate population-level interventions',
    icon: Users,
    color: 'text-indigo-500',
    to: '/public-health',
  },
  {
    id: 'cases',
    title: 'Case Studies',
    description: 'Apply knowledge to integrated scenarios',
    icon: FileText,
    color: 'text-orange-500',
    to: '/cases',
  },
  {
    id: 'assessment',
    title: 'Assessment',
    description: 'Test your knowledge with quizzes',
    icon: BookOpen,
    color: 'text-pink-500',
    to: '/assessment',
  },
];

const Home = () => {
  const userProgress = useAppStore((state) => state.userProgress);
  const completionPercentage = (userProgress.completedModules.length / modules.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          BioEthics & Population Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master biostatistics, ethics, and population health through interactive learning
        </p>
      </div>

      {/* Progress Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Progress
              </CardTitle>
              <CardDescription>
                {userProgress.completedModules.length} of {modules.length} modules completed
              </CardDescription>
            </div>
            <div className="text-3xl font-bold text-primary">
              {completionPercentage.toFixed(0)}%
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3" />
          {userProgress.currentStreak > 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              🔥 {userProgress.currentStreak} day streak!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const isCompleted = userProgress.completedModules.includes(module.id);
            const score = userProgress.assessmentScores[module.id];

            return (
              <Card
                key={module.id}
                className="hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <module.icon className={`h-8 w-8 ${module.color}`} />
                    {isCompleted && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {score !== undefined && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Last score: {score}%
                    </p>
                  )}
                  <Link to={module.to}>
                    <Button className="w-full group-hover:bg-primary/90">
                      {isCompleted ? 'Review' : 'Start Learning'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5">
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            💡 <strong>Tip:</strong> Start with Stats Lab to build your foundation in diagnostic test interpretation
          </p>
          <p className="text-sm">
            📱 <strong>Mobile:</strong> This app works offline! Download it to your device for learning on the go
          </p>
          <p className="text-sm">
            🎯 <strong>Focus:</strong> All content uses synthetic examples - no real patient data
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
