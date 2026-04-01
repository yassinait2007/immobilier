import { Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type ContactFormData } from '@/schemas/contact';

interface ContactFormFieldsProps {
  formData: ContactFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onInputChange: (field: keyof ContactFormData, value: string) => void;
}

const ContactFormFields = ({ formData, errors, isSubmitting, onInputChange }: ContactFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Sujet *
        </Label>
        <Input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => onInputChange('subject', e.target.value)}
          placeholder="Objet de votre demande"
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          Adresse email *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="votre.email@exemple.com"
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tel" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
        </Label>
        <Input
          id="tel"
          type="tel"
          value={formData.tel}
          onChange={(e) => onInputChange('tel', e.target.value)}
          placeholder="+212 6 00 00 00 00"
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            errors.tel ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          disabled={isSubmitting}
        />
        {errors.tel && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.tel}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Message *
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => onInputChange('message', e.target.value)}
          placeholder="Décrivez votre demande ou question en détail..."
          rows={6}
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center">
          {errors.message ? (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </p>
          ) : (
            <span className="text-xs text-gray-500">
              Minimum 10 caractères
            </span>
          )}
          <span className="text-xs text-gray-400">
            {formData.message.length}/1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactFormFields;