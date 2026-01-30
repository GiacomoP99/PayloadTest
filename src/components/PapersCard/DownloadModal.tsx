'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Input } from '../ui/input';

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileUrl: string;
  filename?: string;
  title?: string;
  subtitle?: string;
  privacyPolicyUrl?: string;
}

export const DownloadModal = ({
  open,
  onOpenChange,
  fileUrl,
  filename,
  title = 'Title, es: Scientific Papers',
  subtitle = 'Compila il form per ricevere un link sulla tua mail e scaricare il documento richiesto. Grazie mille.',
  privacyPolicyUrl = '#'
}: DownloadModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !agreed) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Send email with download link
      // For now, we'll just trigger the download after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal and reset form
      onOpenChange(false);
      setName('');
      setEmail('');
      setAgreed(false);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-primary'>{title}</DialogTitle>
          <DialogDescription className='pt-2 text-primary'>
            {subtitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='text-center text-primary text-xsmall'>
            (*) campi obbligatori
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-primary text-xsmall'>
              Name
            </label>
            <Input
              id='name'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              className='bg-background'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-primary text-xsmall'>
              Email <span className='text-destructive'>*</span>
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='bg-background'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-start gap-2'>
              <Checkbox
                id='privacy'
                checked={agreed}
                onCheckedChange={checked => setAgreed(checked === true)}
                required
                className='mt-1'
              />
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='privacy'
                  className='cursor-pointer text-primary text-xsmall'
                >
                  Trattamento dati <span className='text-destructive'>*</span>
                </label>
                <Link
                  href={privacyPolicyUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary text-xsmall underline'
                >
                  Agree with Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <Button
            type='submit'
            disabled={!email || !agreed || isSubmitting}
            className='w-fit cursor-pointer self-center bg-primary text-primary-foreground'
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
