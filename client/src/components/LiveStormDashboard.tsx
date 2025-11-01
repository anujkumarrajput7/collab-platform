import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '@/lib/SocketContext';
import { Zap, TrendingUp, DollarSign, Clock, Users, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ActivityItem {
  type: string;
  timestamp: Date;
  campaign?: any;
  application?: any;
  payment?: any;
}

const activityIcons: Record<string, any> = {
  campaign_created: { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  application_created: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  application_decided: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
  proof_submitted: { icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  proof_verified: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  payment_completed: { icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
};

const getActivityMessage = (activity: ActivityItem) => {
  switch (activity.type) {
    case 'campaign_created':
      return {
        title: 'New Campaign Live!',
        description: `${activity.campaign?.title} - $${activity.campaign?.budget}`,
        urgency: activity.campaign?.urgency
      };
    case 'application_created':
      return {
        title: 'New Application',
        description: `${activity.application?.influencer?.name} applied`,
        urgency: 'medium'
      };
    case 'application_decided':
      return {
        title: activity.application?.status === 'accepted' ? '✅ Accepted!' : '❌ Rejected',
        description: activity.application?.campaign?.title,
        urgency: activity.application?.status === 'accepted' ? 'high' : 'low'
      };
    case 'proof_submitted':
      return {
        title: '📸 Proof Submitted',
        description: activity.application?.campaign?.title,
        urgency: 'medium'
      };
    case 'proof_verified':
      return {
        title: '🎉 Campaign Completed!',
        description: `$${activity.application?.campaign?.budget} earned`,
        urgency: 'high'
      };
    case 'payment_completed':
      return {
        title: '💰 Payment Sent',
        description: `$${activity.payment?.amount}`,
        urgency: 'high'
      };
    default:
      return { title: 'Activity', description: '', urgency: 'low' };
  }
};

const LiveStormDashboard = () => {
  const { liveActivity, connected } = useSocket();
  const [displayActivity, setDisplayActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setDisplayActivity(liveActivity.slice(0, 10));
  }, [liveActivity]);

  return (
    <div className="relative">
      {/* Connection Status */}
      <div className="absolute top-0 right-0 flex items-center gap-2 text-xs">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}
        />
        <span className="text-gray-400">
          {connected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Live Activity Feed */}
      <div className="space-y-2 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">⚡ Live Storm Feed</h3>
        </div>

        <AnimatePresence mode="popLayout">
          {displayActivity.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              <Zap className="h-12 w-12 mx-auto mb-3 text-gray-600" />
              <p>Waiting for activity...</p>
            </motion.div>
          ) : (
            displayActivity.map((activity, index) => {
              const { icon: Icon, color, bg } = activityIcons[activity.type] || activityIcons.campaign_created;
              const message = getActivityMessage(activity);
              
              return (
                <motion.div
                  key={`${activity.type}-${activity.timestamp}-${index}`}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <Card className={`${bg} border-0 backdrop-blur-lg p-4 hover:scale-[1.02] transition-all cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1 }}
                        className={`${bg} p-2 rounded-lg`}
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <p className="font-semibold text-white">{message.title}</p>
                        <p className="text-sm text-gray-400">{message.description}</p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {message.urgency === 'high' && (
                          <Badge variant="default" className="bg-red-500/20 text-red-400 border-0">
                            🔥 HOT
                          </Badge>
                        )}
                        {message.urgency === 'urgent' && (
                          <Badge variant="default" className="bg-orange-500/20 text-orange-400 border-0 animate-pulse">
                            ⚡ URGENT
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveStormDashboard;
