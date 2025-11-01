import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { messagesApi, influencersApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Message {
  _id: string;
  from: string;
  to: string;
  text: string;
  createdAt: string;
}

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachPostId, setAttachPostId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Prefill shared post
    const shared = localStorage.getItem('sharePostId');
    if (shared) {
      setAttachPostId(shared);
      localStorage.removeItem('sharePostId');
      toast({ title: 'Attached', description: 'Post attached to message.' });
    }

    fetchUsers();
  }, [isAuthenticated, navigate, toast]);

  const fetchUsers = async () => {
    try {
      const data: any = await messagesApi.contacts();
      setUsers(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      const data: any = await messagesApi.getThread(userId);
      setMessages(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load messages',
        variant: 'destructive',
      });
    }
  };

  const handleSelectUser = async (selectedUser: User) => {
    setSelectedUser(selectedUser);
    await loadMessages(selectedUser._id);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await messagesApi.send({
        to: selectedUser._id,
        text: newMessage,
        ...(attachPostId ? { postId: attachPostId.trim() } : {})
      });
      setNewMessage('');
      await loadMessages(selectedUser._id);
      toast({
        title: 'Success',
        description: 'Message sent!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Messaging not allowed. The company must initiate or accept you.',
        variant: 'destructive',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-200">Messages</h1>
          <Button variant="glass" onClick={() => navigate('/dashboard')} className="text-slate-200 border border-purple-500/30">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Users List */}
          <Card className="md:col-span-1 bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-slate-200">Contacts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {isLoading ? (
                  <p className="text-center py-4 text-gray-400">Loading...</p>
                ) : users.length === 0 ? (
                  <p className="text-center py-4 text-gray-400">No users found</p>
                ) : (
                  <div className="divide-y divide-purple-500/20">
                    {users.map((u) => (
                      <button
                        key={u._id}
                        onClick={() => handleSelectUser(u)}
                        className={`w-full text-left px-4 py-3 transition ${
                          selectedUser?._id === u._id ? 'bg-purple-500/20' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <p className="font-semibold text-slate-200">{u.name}</p>
                        <p className="text-sm text-gray-400 capitalize">{u.role}</p>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages Area */}
          <Card className="md:col-span-2 bg-slate-900/40 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-slate-200">
                {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a contact'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedUser ? (
                <div className="flex items-center justify-center h-[400px] text-gray-400">
                  Select a user to start messaging
                </div>
              ) : (
                <div className="flex flex-col h-[500px]">
                  {/* Messages */}
                  <ScrollArea className="flex-1 mb-4 pr-4">
                    {messages.length === 0 ? (
                      <p className="text-center text-gray-400 py-8">No messages yet</p>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => {
                          const isMe = msg.from === user._id;
                          return (
                            <div
                              key={msg._id}
                              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-elegant ${
                                  isMe
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-slate-100'
                                    : 'bg-slate-800/70 text-slate-200 border border-purple-500/20'
                                }`}
                              >
                                {msg.post ? (
                                  <div>
                                    <p className="text-xs text-gray-300 mb-2">Shared a post</p>
                                    {msg.post.mediaUrl && (msg.post.mediaUrl.match(/\.mp4|\.webm/i) ? (
                                      <video src={msg.post.mediaUrl} controls className="w-full rounded-lg" />
                                    ) : (
                                      <img src={msg.post.mediaUrl} className="w-full rounded-lg" />
                                    ))}
                                    {msg.post.text && <p className="mt-2 text-sm">{msg.post.text}</p>}
                                  </div>
                                ) : (
                                  <p>{msg.text}</p>
                                )}
                                <p className={`text-xs mt-1 ${isMe ? 'text-purple-200' : 'text-gray-400'}`}>
                                  {new Date(msg.createdAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800/60 border-purple-500/30 text-slate-200 placeholder:text-gray-500 rounded-full"
                      />
                      <Button type="submit" disabled={!newMessage.trim() && !attachPostId.trim()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full">
                        Send
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={attachPostId}
                        onChange={(e)=> setAttachPostId(e.target.value)}
                        placeholder="Attach Post ID (optional)"
                        className="bg-slate-800/60 border-purple-500/30 text-slate-200 placeholder:text-gray-500 rounded-full"
                      />
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
