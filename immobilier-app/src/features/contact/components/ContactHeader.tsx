const ContactHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary-light/10 py-16 lg:py-24">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-6 leading-tight">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre satisfaction est notre priorité. Notre équipe est là pour vous accompagner 
            dans tous vos projets immobiliers à Agadir.
          </p>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default ContactHeader;