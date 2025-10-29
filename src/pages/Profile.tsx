import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Briefcase, LogOut, Sparkles, Calendar, Shield, Zap, Crown, CheckCircle } from 'lucide-react'
import { auth, db, doc, getDoc, signOut } from '../firebase'

export default function Profile() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Set a maximum loading time of 2 seconds
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        const currentUser = auth.currentUser
        if (currentUser) {
          // If still loading after 2 seconds, show basic user data
          setUserData({ 
            email: currentUser.email, 
            uid: currentUser.uid,
            name: currentUser.displayName || 'User'
          })
        }
        setLoading(false)
      }
    }, 2000)

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        clearTimeout(loadingTimeout)
        navigate('/')
        return
      }

      try {
        // Fetch with a race condition - max 1.5 seconds for Firestore
        const fetchPromise = getDoc(doc(db, 'users', user.uid))
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1500))
        
        const docSnap: any = await Promise.race([fetchPromise, timeoutPromise])
        
        if (docSnap && typeof docSnap.exists === 'function' && docSnap.exists()) {
          setUserData({ ...docSnap.data(), email: user.email, uid: user.uid })
        } else {
          // If no user data or timeout, create basic profile
          setUserData({ 
            email: user.email, 
            uid: user.uid,
            name: user.displayName || 'User',
            createdAt: new Date().toISOString()
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // Still set basic user data even if fetch fails
        setUserData({ 
          email: user.email, 
          uid: user.uid,
          name: user.displayName || 'User'
        })
      }
      
      clearTimeout(loadingTimeout)
      setLoading(false)
    })

    return () => {
      clearTimeout(loadingTimeout)
      unsubscribe()
    }
  }, [navigate, loading])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-emerald-400 font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grain Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <nav className="py-5 flex items-center justify-center gap-8" style={{ marginLeft: '-20px' }}>
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Dashboard</Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Contact</Link>

            <Link to="/" className="group mx-4">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Draftly
              </span>
            </Link>

            <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Features</a>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Your Profile
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{userData?.name?.split(' ')[0] || 'there'}</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur opacity-50" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border-2 border-white/10">
                      <User className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {userData?.name || 'User'}
                    </h2>
                    <p className="text-emerald-400 font-semibold mb-3 capitalize" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {userData?.industry?.replace('_', ' ') || 'Member'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Verified Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-emerald-400" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Email Address</div>
                      <div className="text-sm text-white font-medium truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {userData?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-purple-400" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Profession</div>
                      <div className="text-sm text-white font-medium capitalize truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {userData?.industry?.replace('_', ' ') || 'Not specified'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-400" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Member Since</div>
                      <div className="text-sm text-white font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Crown className="w-5 h-5 text-orange-400" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Plan</div>
                      <div className="text-sm text-white font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Waitlist
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Account Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Account Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/pricing"
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold text-sm flex items-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <Zap className="w-4 h-4" />
                    Upgrade Plan
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-all font-semibold text-sm flex items-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Stats & Info */}
            <div className="space-y-6">
              {/* Waitlist Position */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Waitlist Status
                  </h3>
                </div>
                <p className="text-sm text-gray-400 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  You're on the early access waitlist!
                </p>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  #247
                </div>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Position in queue
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Account Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Components Generated</span>
                      <span className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>0</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Projects</span>
                      <span className="text-sm font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>0</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Security
                  </h3>
                </div>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Your account is protected with enterprise-grade security
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

