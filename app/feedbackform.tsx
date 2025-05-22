'use client';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from '@/public/logo-gf.png';
import HomeIcon from '@/public/home.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useParams } from 'next/navigation';

// Definisi untuk bentuk kolaborasi
const bentuk_kolaborasi = [
  {
    id: 'speaker / narasumber',
    label: {
      id: 'Speaker / Narasumber',
      en: 'Speaker / Resource Person',
    },
  },
  {
    id: 'media partner',
    label: {
      id: 'Media Partner',
      en: 'Media Partner',
    },
  },
  {
    id: 'donasi',
    label: {
      id: 'Donasi',
      en: 'Donation',
    },
  },
  {
    id: 'eco ranger program',
    label: {
      id: 'Eco Ranger Program',
      en: 'Eco Ranger Program',
    },
  },
  {
    id: 'aksi clean up',
    label: {
      id: 'Aksi Clean Up',
      en: 'Clean Up Action',
    },
  },
  {
    id: 'yang lain',
    label: {
      id: 'Yang Lain',
      en: 'Others',
    },
  },
] as const;

// Konten berdasarkan bahasa
const content = {
  id: {
    header: {
      link: 'Kembali ke Halaman Kerja Sama',
      backButton: 'Kembali ke Halaman Utama',
    },
    title: 'Formulir Umpan Balik Kolaborasi 📝',
    description:
      'Dear Semua Partner 💙 Terima kasih telah berkolaborasi dengan Greeneration Foundation. Kami sangat menghargai kontribusi dan dukungan yang telah diberikan. Untuk terus meningkatkan kualitas kerja sama dan memberikan pengalaman yang lebih baik di masa mendatang, kami ingin mendengar pendapat Anda. Mohon luangkan beberapa menit untuk mengisi formulir umpan balik ini. Setiap saran dan masukan sangat berarti bagi kami dalam membangun kolaborasi yang lebih efektif dan berdampak. Terima kasih atas waktu dan perhatiannya! 😊 Salam Lestari, Greeneration Foundation',
    form: {
      nama: 'Nama',
      perusahaan: 'Perusahaan',
      posisi: 'Posisi',
      bentuk_kolaborasi: 'Bentuk Kolaborasi',
      other_placeholder: 'Tulis bentuk kolaborasi lain...',
      evaluasi: {
        title: 'Evaluasi Kolaborasi',
        question1: 'Bagaimana penilaian Anda terhadap keseluruhan pengalaman bekerja sama dengan kami?',
        question2: 'Seberapa efektif komunikasi dan koordinasi yang dilakukan selama kolaborasi?',
        question3: 'Apakah informasi dan dukungan yang diberikan sebelum dan selama acara sudah memadai?',
        low: 'Sangat Tidak Puas',
        high: 'Sangat Puas',
      },
      dampak: {
        title: 'Dampak & Manfaat',
        question1: 'Apakah tujuan organisasi Anda sudah tercapai melalui kolaborasi yang dijalankan?',
        question2: 'Saran atau masukan selama berkolaborasi dengan Greeneration Foundation',
        question3: 'Apakah Anda bersedia berkolaborasi kembali dengan kami di kesempatan mendatang?',
        placeholder1: 'Evaluasi Kolaborasi',
        placeholder2: 'Saran atau Masukan',
        option1: 'Ya',
        option2: 'Tidak',
        option3: 'Mungkin',
      },
      submit: 'Kirim',
      required: '*',
    },
    footer: 'Yayasan Greeneration Indonesia © 2021 | All Rights Reserved, Designed By Yayasan Greeneration Indonesia',
    alerts: {
      success: 'Feedback berhasil dikirim!',
      error: 'Terjadi kesalahan saat mengirim feedback',
    },
  },
  en: {
    header: {
      link: 'Back to Home Page',
      backButton: 'Back to Main Page',
    },
    title: 'Collaboration Feedback Form 📝',
    description:
      'Dear All Partners 💙 Thank you for collaborating with Greeneration Foundation. We greatly appreciate the contribution and support you have provided. To continuously improve the quality of our cooperation and provide a better experience in the future, we would like to hear your opinions. Please take a few minutes to fill out this feedback form. Every suggestion and input is very meaningful for us in building more effective and impactful collaborations. Thank you for your time and attention! 😊 Best regards, Greeneration Foundation',
    form: {
      nama: 'Name',
      perusahaan: 'Company',
      posisi: 'Position',
      bentuk_kolaborasi: 'Type of Collaboration',
      other_placeholder: 'Write other collaboration type...',
      evaluasi: {
        title: 'Collaboration Evaluation',
        question1: 'How would you rate your overall experience working with us?',
        question2: 'How effective was the communication and coordination during the collaboration?',
        question3: 'Was the information and support provided before and during the event adequate?',
        low: 'Very Dissatisfied',
        high: 'Very Satisfied',
      },
      dampak: {
        title: 'Impact & Benefits',
        question1: "Have your organization's goals been achieved through this collaboration?",
        question2: 'Suggestions or feedback while collaborating with Greeneration Foundation',
        question3: 'Would you be willing to collaborate with us again in the future?',
        placeholder1: 'Collaboration Evaluation',
        placeholder2: 'Suggestions or Feedback',
        option1: 'Yes',
        option2: 'No',
        option3: 'Maybe',
      },
      submit: 'Submit',
      required: '*',
    },
    footer: 'Yayasan Greeneration Indonesia © 2021 | All Rights Reserved, Designed By Yayasan Greeneration Indonesia',
    alerts: {
      success: 'Feedback successfully sent!',
      error: 'An error occurred while sending feedback',
    },
  },
};

const formSchema = z.object({
  nama: z.string().min(1, { message: 'Nama is required' }),
  perusahaan: z.string().min(1, { message: 'Perusahaan is required' }),
  posisi: z.string().min(1, { message: 'Posisi is required' }),
  bentuk_kolaborasi: z.array(z.string()).min(1, { message: 'Bentuk Kolaborasi is required' }),
  evaluasi_1: z.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  evaluasi_2: z.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  evaluasi_3: z.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  dampak_1: z.string().min(1, { message: 'Dampak is required' }),
  dampak_2: z.string().min(1, { message: 'Dampak is required' }),
  dampak_3: z.string().min(1, { message: 'Dampak is required' }),
});

export function FeedbackForm() {
  const params = useParams();
  
  const [lang, setLang] = useState<'id' | 'en'>('id');
  
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/en/') || path.endsWith('/en')) {
      setLang('en');
    }
    
    const parentElement = document.querySelector('[data-lang="en"]');
    if (parentElement) {
      setLang('en');
    }
    
    if (params?.lang === 'en') {
      setLang('en');
    }
  }, [params]);

  const [otherValue, setOtherValue] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
      perusahaan: '',
      posisi: '',
      bentuk_kolaborasi: [],
      evaluasi_1: '',
      evaluasi_2: '',
      evaluasi_3: '',
      dampak_1: '',
      dampak_2: '',
      dampak_3: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    let dataToSend = { ...data };
    
    if (data.bentuk_kolaborasi.includes('yang lain') && otherValue.trim() !== '') {
      dataToSend.bentuk_kolaborasi = data.bentuk_kolaborasi.map(
        (item) => (item === 'yang lain' ? `Yang Lain: ${otherValue}` : item)
      );
    }
    
    dataToSend.path = 'Sheet1'; 
    
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    
    const responseText = await res.text();
    console.log('Server response:', responseText);
    
    if (!res.ok) throw new Error(`${content[lang].alerts.error}: ${responseText}`);
    
    alert(content[lang].alerts.success);
    form.reset();
    setOtherValue(''); 
  } catch (error) {
    console.error('Submit error:', error);
    alert(`${content[lang].alerts.error}: ${error.message}`);
  }
};

  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col-3 justify-between bg-[#f8f9fa] w-full h-[70px] mb-10">
        <div className="mt-8 pl-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <div className="hidden lg:flex">
                    <Link href="/">{content[lang].header.link}</Link>
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="h-35 w-35 mt-5">
          <Image src={Logo} alt="Logo" width={250} height={400} />
        </div>
        <div className="mt-5 pr-5">
          <Button onClick={() => (window.location.href = 'https://greeneration.org/')}>
            <Image src={HomeIcon} alt="Icon" width={10} height={10} />
            <span className="hidden lg:flex">{content[lang].header.backButton}</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 lg:mb-20 lg:w-2xl">
        <h1 className="text-3xl font-bold text-center">{content[lang].title}</h1>
        <p className="text-center mt-4 text-black/60">{content[lang].description}</p>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid p-5 gap-10 lg:grid-cols-2 lg:gap-20">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {content[lang].form.nama}
                    <span className="text-red-500">{content[lang].form.required}</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={content[lang].form.nama} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="perusahaan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {content[lang].form.perusahaan}
                    <span className="text-red-500">{content[lang].form.required}</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={content[lang].form.perusahaan} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posisi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {content[lang].form.posisi}
                    <span className="text-red-500">{content[lang].form.required}</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={content[lang].form.posisi} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bentuk_kolaborasi"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>
                      {content[lang].form.bentuk_kolaborasi}
                      <span className="text-red-500">{content[lang].form.required}</span>
                    </FormLabel>
                  </div>
                  {bentuk_kolaborasi.map((bentuk) => (
                    <FormField
                      key={bentuk.id}
                      control={form.control}
                      name="bentuk_kolaborasi"
                      render={({ field }) => {
                        const checked = field.value?.includes(bentuk.id);
                        return (
                          <React.Fragment key={bentuk.id}>
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...(field.value as string[]), bentuk.id]);
                                    } else {
                                      field.onChange((field.value as string[]).filter((v) => v !== bentuk.id));
                                      if (bentuk.id === 'yang lain') setOtherValue(''); // reset input jika uncheck
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{bentuk.label[lang]}</FormLabel>
                            </FormItem>
                            {/* Tampilkan input jika "Yang Lain" dicentang */}
                            {bentuk.id === 'yang lain' && checked && (
                              <div className="ml-8 mt-2">
                                <Input placeholder={content[lang].form.other_placeholder} value={otherValue} onChange={(e) => setOtherValue(e.target.value)} />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Evaluasi Kolaborasi */}
          <div className="mt-8 p-5">
            <FormField
              control={form.control}
              name="evaluasi_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">{content[lang].form.evaluasi.title}</FormLabel>
                  <FormControl>
                    <div>
                      <p className="mb-4">
                        {content[lang].form.evaluasi.question1}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="grid grid-cols-5">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="option-one" />
                            <Label htmlFor="option-one">1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="option-two" />
                            <Label htmlFor="option-two">2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="option-three" />
                            <Label htmlFor="option-three">3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="option-four" />
                            <Label htmlFor="option-four">4</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="option-five" />
                            <Label htmlFor="option-five">5</Label>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>{content[lang].form.evaluasi.low}</p>
                          <p>{content[lang].form.evaluasi.high}</p>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 p-5">
            <FormField
              control={form.control}
              name="evaluasi_2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <p className="mb-4">
                        {content[lang].form.evaluasi.question2}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="grid grid-cols-5">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="option-one" />
                            <Label htmlFor="option-one">1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="option-two" />
                            <Label htmlFor="option-two">2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="option-three" />
                            <Label htmlFor="option-three">3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="option-four" />
                            <Label htmlFor="option-four">4</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="option-five" />
                            <Label htmlFor="option-five">5</Label>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>{content[lang].form.evaluasi.low}</p>
                          <p>{content[lang].form.evaluasi.high}</p>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 p-5">
            <FormField
              control={form.control}
              name="evaluasi_3"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <p className="mb-4">
                        {content[lang].form.evaluasi.question3}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="grid grid-cols-5">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="option-one" />
                            <Label htmlFor="option-one">1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="option-two" />
                            <Label htmlFor="option-two">2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="option-three" />
                            <Label htmlFor="option-three">3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="option-four" />
                            <Label htmlFor="option-four">4</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="option-five" />
                            <Label htmlFor="option-five">5</Label>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>{content[lang].form.evaluasi.low}</p>
                          <p>{content[lang].form.evaluasi.high}</p>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dampak dan Manfaat */}
          <div className="mt-8 p-5">
            <FormField
              control={form.control}
              name="dampak_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">{content[lang].form.dampak.title}</FormLabel>
                  <FormControl>
                    <div className="mb-6">
                      <p className="mb-4">
                        {content[lang].form.dampak.question1}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <Input placeholder={content[lang].form.dampak.placeholder1} type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dampak_2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-6">
                      <p className="mb-4">
                        {content[lang].form.dampak.question2}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <Input placeholder={content[lang].form.dampak.placeholder2} type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dampak_3"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <p className="mb-4">
                        {content[lang].form.dampak.question3}
                        <span className="text-red-500">{content[lang].form.required}</span>
                      </p>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="grid grid-cols-5">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Ya" id="option-one" />
                            <Label htmlFor="option-one">{content[lang].form.dampak.option1}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Tidak" id="option-two" />
                            <Label htmlFor="option-two">{content[lang].form.dampak.option2}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Mungkin" id="option-three" />
                            <Label htmlFor="option-three">{content[lang].form.dampak.option3}</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 pl-5">
            <Button className="w-full" type="submit">
              {content[lang].form.submit}
            </Button>
          </div>
        </form>
      </Form>

      {/* Footer Section */}
      <footer className="flex flex-col items-center justify-center bg-[#f8f9fa] mt-10">
        <div className="mt-5 flex justify-center mb-5">
          <Image src={Logo} alt="Logo" width={150} height={200} />
        </div>
        <p className="text-lg text-black/60 mb-10 text-center">{content[lang].footer}</p>
      </footer>
    </section>
  );
}
