/**
 * Socket.IO utility for emitting real-time events
 */

let io;

const initSocket = (socketIo) => {
  io = socketIo;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

// Emit campaign events
const emitCampaignCreated = (campaign) => {
  if (io) {
    io.emit('campaign:new', {
      type: 'campaign_created',
      campaign,
      timestamp: new Date()
    });
  }
};

const emitCampaignUpdated = (campaign) => {
  if (io) {
    io.emit('campaign:updated', {
      type: 'campaign_updated',
      campaign,
      timestamp: new Date()
    });
  }
};

// Emit application events
const emitApplicationCreated = (application) => {
  if (io) {
    io.emit('application:new', {
      type: 'application_created',
      application,
      timestamp: new Date()
    });
  }
};

const emitApplicationDecided = (application) => {
  if (io) {
    io.emit('application:decided', {
      type: 'application_decided',
      application,
      timestamp: new Date()
    });
    
    // Notify the specific influencer
    if (application.influencer) {
      io.to(application.influencer.toString()).emit('application:status', {
        application,
        timestamp: new Date()
      });
    }
  }
};

// Emit proof events
const emitProofSubmitted = (application) => {
  if (io) {
    io.emit('proof:submitted', {
      type: 'proof_submitted',
      application,
      timestamp: new Date()
    });
  }
};

const emitProofVerified = (application) => {
  if (io) {
    io.emit('proof:verified', {
      type: 'proof_verified',
      application,
      timestamp: new Date()
    });
    
    // Notify the influencer
    if (application.influencer) {
      io.to(application.influencer.toString()).emit('proof:status', {
        application,
        verified: true,
        timestamp: new Date()
      });
    }
  }
};

// Emit payment events
const emitPaymentCompleted = (payment) => {
  if (io) {
    io.emit('payment:completed', {
      type: 'payment_completed',
      payment,
      timestamp: new Date()
    });
  }
};

// Emit leaderboard updates
const emitLeaderboardUpdate = (leaderboard) => {
  if (io) {
    io.emit('leaderboard:update', {
      type: 'leaderboard_update',
      leaderboard,
      timestamp: new Date()
    });
  }
};

module.exports = {
  initSocket,
  getIO,
  emitCampaignCreated,
  emitCampaignUpdated,
  emitApplicationCreated,
  emitApplicationDecided,
  emitProofSubmitted,
  emitProofVerified,
  emitPaymentCompleted,
  emitLeaderboardUpdate
};
