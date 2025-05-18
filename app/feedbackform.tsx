'use client';
import * as zod from 'zod';
import Link from 'next/link';
import Image from 'next/image';
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

const bentuk_kolaborasi = [
  {
    id: 'speaker / narasumber',
    label: 'Speaker / Narasumber',
  },
  {
    id: 'media partner',
    label: 'Media Partner',
  },
  {
    id: 'donasi',
    label: 'Donasi',
  },
  {
    id: 'eco ranger program',
    label: 'Eco Ranger Program',
  },
  {
    id: 'aksi clean up',
    label: 'Aksi Clean Up',
  },
  {
    id: 'yang lain',
    label: 'Yang Lain',
  },
] as const;

const formSchema = zod.object({
  nama: zod.string().min(1, { message: 'Nama is required' }),
  perusahaan: zod.string().min(1, { message: 'Perusahaan is required' }),
  posisi: zod.string().min(1, { message: 'Posisi is required' }),
  bentuk_kolaborasi: zod.array(zod.string()).min(1, { message: 'Bentuk Kolaborasi is required' }),
  evaluasi_1: zod.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  evaluasi_2: zod.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  evaluasi_3: zod.string().min(1, { message: 'Evaluasi Kolaborasi is required' }),
  dampak_1: zod.string().min(1, { message: 'Dampak is required' }),
  dampak_2: zod.string().min(1, { message: 'Dampak is required' }),
  dampak_3: zod.string().min(1, { message: 'Dampak is required' }),
});

export function FeedbackForm() {
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
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Gagal menyimpan feedback');
      alert('Feedback berhasil dikirim!');
      form.reset();
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim feedback');
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
                    <Link href="/">Kembali ke Halaman Kerja Sama</Link>
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
            <span className="hidden lg:flex">Kembali ke Halaman Utama</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 lg:mb-20 lg:w-2xl">
        <h1 className="text-3xl font-bold text-center">Collaboration Feedback 📝</h1>
        <p className="text-center mt-4 text-black/60">
          Dear All Partner 💙 Terima kasih telah berkolaborasi dengan Greeneration Foundation. Kami sangat menghargai kontribusi dan dukungan yang telah diberikan. Untuk terus meningkatkan kualitas kerja sama dan memberikan pengalaman yang
          lebih baik di masa mendatang, kami ingin mendengar pendapat Anda. Mohon luangkan beberapa menit untuk mengisi formulir umpan balik ini. Setiap saran dan masukan sangat berarti bagi kami dalam membangun kolaborasi yang lebih
          efektif dan berdampak. Terima kasih atas waktu dan perhatiannya! 😊 Salam Lestari, Greeneration Foundation
        </p>
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
                    Nama<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" type="text" {...field} />
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
                    Perusahaan<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Perusahaan" type="text" {...field} />
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
                    Posisi<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Posisi" type="text" {...field} />
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
                      Bentuk Kolaborasi<span className="text-red-500">*</span>
                    </FormLabel>
                  </div>
                  {bentuk_kolaborasi.map((bentuk_kolaborasi) => (
                    <FormField
                      key={bentuk_kolaborasi.id}
                      control={form.control}
                      name="bentuk_kolaborasi"
                      render={({ field }) => {
                        return (
                          <FormItem key={bentuk_kolaborasi.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(bentuk_kolaborasi.id)}
                                onCheckedChange={(checked) => {
                                  return checked ? field.onChange([...(field.value as string[]), bentuk_kolaborasi.id]) : field.onChange((field.value as string[])?.filter((value: string) => value !== bentuk_kolaborasi.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{bentuk_kolaborasi.label}</FormLabel>
                          </FormItem>
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
                  <FormLabel className="text-xl font-bold">Evaluasi Kolaborasi</FormLabel>
                  <FormControl>
                    <div>
                      <p className="mb-4">
                        Bagaimana penilaian Anda terhadap keseluruhan pengalaman bekerja sama dengan kami?<span className="text-red-500">*</span>
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
                          <p>Sangat Tidak Puas</p>
                          <p>Sangat Puas</p>
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
                        Seberapa efektif komunikasi dan koordinasi yang dilakukan selama kolaborasi?<span className="text-red-500">*</span>
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
                          <p>Sangat Tidak Puas</p>
                          <p>Sangat Puas</p>
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
                        Apakah informasi dan dukungan yang diberikan sebelum dan selama acara sudah memadai?<span className="text-red-500">*</span>
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
                          <p>Sangat Tidak Puas</p>
                          <p>Sangat Puas</p>
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
                  <FormLabel className="text-xl font-bold">Dampak & Manfaat </FormLabel>
                  <FormControl>
                    <div className="mb-6">
                      <p className="mb-4">
                        Apakah tujuan organisasi Anda sudah tercapai melalui kolaborasi yang dijalankan?<span className="text-red-500">*</span>
                      </p>
                      <Input placeholder="Evaluasi Kolaborasi" type="text" {...field} />
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
                        Saran atau masukan selama berkolaborasi dengan Greeneration Foundation<span className="text-red-500">*</span>
                      </p>
                      <Input placeholder="Saran atau Masukan" type="text" {...field} />
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
                        Apakah Anda bersedia berkolaborasi kembali dengan kami di kesempatan mendatang?<span className="text-red-500">*</span>
                      </p>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="grid grid-cols-5">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Ya" id="option-one" />
                            <Label htmlFor="option-one">Ya</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Tidak" id="option-two" />
                            <Label htmlFor="option-two">Tidak</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Mungkin" id="option-three" />
                            <Label htmlFor="option-three">Mungkin</Label>
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
