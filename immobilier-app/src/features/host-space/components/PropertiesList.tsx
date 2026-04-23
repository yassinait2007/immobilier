import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/context/PropertyContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Home, MapPin, Star, Plus, Settings2, Trash2, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/utils/toast';

export const PropertiesList = () => {
  const { properties, loading: loadingProperties, error: errorProperties } = useProperties();
  const { info } = useToast();
  const handleNotImplemented = () => info("En cours de développement \uD83D\uDEA7", "Cette fonctionnalité arrive bientôt.");

  if (loadingProperties) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (errorProperties) {
    return (
      <div className="bg-red-50 p-6 rounded-2xl flex flex-col items-center gap-4 text-red-700 border border-red-100">
        <div className="p-3 bg-red-100/50 rounded-full">
           <Home className="h-8 w-8" />
        </div>
        <div className="text-center">
          <p className="text-lg font-black tracking-tight">Erreur de chargement</p>
          <p className="max-w-xs opacity-80 mt-1">{errorProperties}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            Mes Biens Immobiliers
          </h2>
          <p className="text-sm text-gray-400 font-medium">Gérez la visibilité et les détails de vos propriétés.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex bg-gray-100 p-1 rounded-xl h-10">
              <Button variant="ghost" size="icon" className="rounded-lg h-full w-8 bg-white shadow-sm"><LayoutGrid className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="rounded-lg h-full w-8 text-gray-400"><List className="h-4 w-4" /></Button>
           </div>
           <Button asChild className="bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-md rounded-xl h-10">
             <Link to="/host/add-property">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Bien
             </Link>
          </Button>
        </div>
      </div>

      {properties.length === 0 ? (
        <Card className="border-dashed border-2 bg-gray-50/30">
          <CardContent className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="p-10 bg-white rounded-full shadow-sm border border-gray-100 mb-8 transform hover:rotate-6 transition-transform">
               <Home className="h-16 w-16 opacity-30 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Aucune propriété répertoriée</p>
            <p className="max-w-md text-center font-medium opacity-60">Attirez plus de voyageurs en ajoutant vos villas, appartements ou chambres d'hôtes dès maintenant.</p>
            <Button asChild className="mt-8 bg-blue-600 rounded-2xl h-14 px-10 font-black shadow-lg hover:scale-105 transition-transform">
                <Link to="/host/add-property">
                  Commencer mon activité
                </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all group rounded-3xl bg-white ring-1 ring-gray-100 hover:ring-blue-100">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={(property as any).media && (property as any).media[0]?.url || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                       <Badge className={`${property.status?.value === 'published' || property.status?.value === 'active' ? 'bg-green-500' : 'bg-orange-500'} font-black px-3 py-1 text-[10px] uppercase tracking-widest`}>
                          {property.status?.name || 'Privé'}
                       </Badge>
                    </div>
                    {property.rate && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5 border border-white/50">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-black text-gray-900">{property.rate}</span>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pt-6 pb-2">
                    <div className="flex items-center gap-1 text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                       <MapPin className="h-3 w-3" />
                       <span className="line-clamp-1">{(property as any).address?.city?.name || 'Localisation inconnue'}</span>
                    </div>
                    <CardTitle className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors mt-1">
                       {property.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                     <p className="text-sm text-gray-400 line-clamp-2 min-h-[2.5rem] font-medium leading-relaxed">
                        {property.description || 'Pas de description fournie pour ce bien.'}
                     </p>
                     
                     <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Prix</span>
                           <span className="text-xl font-black text-gray-900">{property.price} <span className="text-xs font-normal text-gray-500">MAD</span></span>
                        </div>
                        <div className="flex flex-col ml-auto">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Détails</span>
                           <span className="text-sm font-black text-gray-600">{property.nbRooms || 0} Ch. • {property.surface || 0} m²</span>
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50/50 p-4 flex gap-2 border-t border-gray-50">
                     <Button variant="outline" className="flex-1 rounded-2xl h-12 bg-white border-gray-100 hover:bg-gray-100 text-gray-600 font-black tracking-tight" asChild>
                        <Link to={`/property/${property.id}`}>
                           Détails
                        </Link>
                     </Button>
                     <Button variant="outline" className="rounded-2xl h-12 w-12 bg-white border-gray-100 hover:bg-blue-50 hover:text-blue-600 p-0">
                        <Settings2 className="h-5 w-5" />
                     </Button>
                     <Button variant="outline" className="rounded-2xl h-12 w-12 bg-white border-gray-100 hover:bg-red-50 hover:text-red-500 p-0">
                        <Trash2 className="h-5 w-5" />
                     </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
