'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Trophy, 
  Share2, 
  Heart, 
  Search,
  Filter,
  Plus,
  Zap,
  Target,
  Award,
  Clock,
  Navigation
} from 'lucide-react'

// Mock data for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join industry leaders for cutting-edge tech discussions',
    category: 'CONFERENCE',
    imageUrl: '/api/placeholder/400/200',
    startDate: new Date('2025-10-15T09:00:00'),
    location: 'San Francisco Convention Center',
    price: 299,
    attendees: 1250,
    distance: '2.3 km',
    tags: ['AI', 'Machine Learning', 'Startups']
  },
  {
    id: '2',
    title: 'Jazz Night Live',
    description: 'An evening of smooth jazz with local artists',
    category: 'CONCERT',
    imageUrl: '/api/placeholder/400/200',
    startDate: new Date('2025-09-28T19:30:00'),
    location: 'Blue Note Jazz Club',
    price: 45,
    attendees: 180,
    distance: '1.1 km',
    tags: ['Jazz', 'Live Music', 'Local Artists']
  },
  {
    id: '3',
    title: 'Basketball Championship',
    description: 'Finals of the city basketball league',
    category: 'SPORTS',
    imageUrl: '/api/placeholder/400/200',
    startDate: new Date('2025-10-02T18:00:00'),
    location: 'City Sports Arena',
    price: 25,
    attendees: 5000,
    distance: '3.7 km',
    tags: ['Basketball', 'Championship', 'Sports']
  },
  {
    id: '4',
    title: 'React Developers Meetup',
    description: 'Monthly gathering for React enthusiasts',
    category: 'MEETUP',
    imageUrl: '/api/placeholder/400/200',
    startDate: new Date('2025-09-30T18:30:00'),
    location: 'Tech Hub Co-working Space',
    price: 0,
    attendees: 85,
    distance: '0.8 km',
    tags: ['React', 'JavaScript', 'Networking']
  }
]

const mockUser = {
  name: 'Alex Johnson',
  points: 2450,
  level: 7,
  badges: [
    { name: 'Event Explorer', icon: '🗺️', color: 'bg-blue-500' },
    { name: 'Social Butterfly', icon: '🦋', color: 'bg-purple-500' },
    { name: 'Tech Enthusiast', icon: '💻', color: 'bg-green-500' }
  ]
}

const categories = [
  { id: 'ALL', name: 'All Events', icon: '🎯' },
  { id: 'CONCERT', name: 'Concerts', icon: '🎵' },
  { id: 'CONFERENCE', name: 'Conferences', icon: '🎤' },
  { id: 'SPORTS', name: 'Sports', icon: '⚽' },
  { id: 'MEETUP', name: 'Meetups', icon: '👥' }
]

export default function EventDiscoveryApp() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set())
  const [rsvpEvents, setRsvpEvents] = useState<Set<string>>(new Set())
  const [showGamification, setShowGamification] = useState(false)

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleLike = (eventId: string) => {
    const newLiked = new Set(likedEvents)
    if (newLiked.has(eventId)) {
      newLiked.delete(eventId)
    } else {
      newLiked.add(eventId)
    }
    setLikedEvents(newLiked)
  }

  const handleRSVP = (eventId: string) => {
    const newRSVP = new Set(rsvpEvents)
    if (newRSVP.has(eventId)) {
      newRSVP.delete(eventId)
    } else {
      newRSVP.add(eventId)
      // Simulate adding to calendar
      alert('Event added to your calendar! 📅')
    }
    setRsvpEvents(newRSVP)
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.icon || '🎯'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">EventHub</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGamification(!showGamification)}
                className="flex items-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>{mockUser.points}</span>
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Gamification Panel */}
      <AnimatePresence>
        {showGamification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{mockUser.points}</div>
                    <div className="text-sm opacity-90">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Level {mockUser.level}</div>
                    <div className="text-sm opacity-90">Explorer</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {mockUser.badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                      <span>{badge.icon}</span>
                      <span className="text-sm">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-4xl">{getCategoryIcon(event.category)}</span>
                  </div>
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {event.category.toLowerCase()}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => handleLike(event.id)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${likedEvents.has(event.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Share2 className="w-4 h-4 text-slate-600" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </CardTitle>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {event.price === 0 ? 'Free' : `$${event.price}`}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.startDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{event.location}</span>
                      <span className="ml-auto text-blue-600 font-medium">{event.distance}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attending
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleRSVP(event.id)}
                      >
                        {rsvpEvents.has(event.id) ? (
                          <>
                            <Calendar className="w-4 h-4 mr-1" />
                            Added
                          </>
                        ) : (
                          'RSVP'
                        )}
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Discovery Challenges */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Discovery Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Attend 3 Events</h3>
                    <p className="text-sm text-slate-600">Progress: 2/3</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Share 5 Events</h3>
                    <p className="text-sm text-slate-600">Progress: 3/5</p>
                    <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Try New Category</h3>
                    <p className="text-sm text-slate-600">Explore different events</p>
                    <Badge className="mt-2 bg-green-500">+100 Points</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
