export const Quote = ()=> {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-lg text-center px-8">
        <div className="mb-6">
          <svg className="w-12 h-12 mx-auto text-white/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>
        <blockquote className="text-2xl font-bold leading-relaxed mb-6">
          "A blog is a conversation. People go to blogs to read AND write, not just consume."
        </blockquote>
        <cite className="text-lg text-white/80 font-medium">— Michael Arrington</cite>
        <div className="mt-8 text-white/60">
          <p className="text-sm">Join thousands of writers sharing their stories</p>
        </div>
      </div>
    </div>
  )
}
