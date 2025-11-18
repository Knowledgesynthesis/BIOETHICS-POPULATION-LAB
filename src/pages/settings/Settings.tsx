import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { Settings as SettingsIcon, Moon, Sun, Download, Trash2 } from 'lucide-react';

const Settings = () => {
  const { settings, updateSettings, userProgress } = useAppStore();

  const handleToggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      // Reset would be implemented here
      alert('Progress reset functionality would be implemented here.');
    }
  };

  const handleExportData = () => {
    const data = {
      userProgress,
      settings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bioethics-lab-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-gray-500" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your preferences and application settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the app looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  {settings.darkMode ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
            <Button onClick={handleToggleDarkMode} variant="outline">
              {settings.darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <div className="font-medium">Font Size</div>
              <div className="text-sm text-muted-foreground">
                Current: {settings.fontSize}
              </div>
            </div>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={settings.fontSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSettings({ fontSize: size })}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Track your progress across all modules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">
                {userProgress.completedModules.length}
              </div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">
                {Object.keys(userProgress.assessmentScores).length}
              </div>
              <div className="text-sm text-muted-foreground">Assessments Taken</div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <div className="text-2xl font-bold text-primary">
                {userProgress.currentStreak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold mb-3">Assessment Scores</h4>
            <div className="space-y-2">
              {Object.keys(userProgress.assessmentScores).length > 0 ? (
                Object.entries(userProgress.assessmentScores).map(([module, score]) => (
                  <div key={module} className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <span className="font-medium capitalize">{module}</span>
                    <Badge variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'destructive'}>
                      {score}%
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No assessments completed yet
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or reset your learning data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div>
              <div className="font-medium">Export Data</div>
              <div className="text-sm text-muted-foreground">
                Download your progress and settings as JSON
              </div>
            </div>
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-md">
            <div>
              <div className="font-medium text-red-600 dark:text-red-400">Reset Progress</div>
              <div className="text-sm text-muted-foreground">
                Clear all learning progress and scores
              </div>
            </div>
            <Button onClick={handleResetProgress} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Application information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Version</div>
              <div className="font-medium">1.0.0</div>
            </div>
            <div>
              <div className="text-muted-foreground">Build</div>
              <div className="font-medium">2024.01</div>
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>BioEthics & Population Lab</strong> is an educational platform for medical trainees
              to master biostatistics, ethics, HIPAA, safety, and public health principles.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              All scenarios and examples are synthetic. No real patient data is used.
            </p>
          </div>
          <div className="pt-3 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">WCAG 2.2 AA Compliant</Badge>
              <Badge variant="outline">Offline Capable</Badge>
              <Badge variant="outline">Mobile Optimized</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
