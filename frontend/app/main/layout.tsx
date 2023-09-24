export default function AppLayout({ children } : {children: React.ReactNode}){
  

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <nav className="to-blue-400"> Journal App name</nav> */}
 
      {children}
    </section>
  )
}