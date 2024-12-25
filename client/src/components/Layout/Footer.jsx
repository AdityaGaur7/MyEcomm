

const Footer = () => {  
  return (  
    <footer className="bg-dark text-white text-center py-3">  
      <div className="container">  
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>  
        <a href="/privacy-policy" className="text-white">Privacy Policy</a> |   
        <a href="/terms-of-service" className="text-white"> Terms of Service</a>  
      </div>  
    </footer>  
  );  
};  

export default Footer;