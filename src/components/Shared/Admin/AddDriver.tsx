import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  dob: z.string().min(4, 'Date of birth is required'),
  nin: z.string().min(11, 'NIN is required'),
  phones: z.array(z.string().min(11, 'Phone number must be at least 7 characters')).min(1, 'At least one phone number is required'),
  addresses: z.array(z.string().min(4, 'Address must be at least 4 characters')).min(1, 'At least one address is required'),
});

type DriverRegisterForm = z.infer<typeof schema>;

export default function AddDriver() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [phoneInputs, setPhoneInputs] = useState(['']);
  const [addressInputs, setAddressInputs] = useState(['']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<DriverRegisterForm>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      phones: [''],
      addresses: [''],
    }
  });

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const addPhoneInput = () => {
    setPhoneInputs([...phoneInputs, '']);
    setValue('phones', [...phoneInputs, '']);
  };

  const removePhoneInput = (index: number) => {
    const newPhones = phoneInputs.filter((_, i) => i !== index);
    setPhoneInputs(newPhones);
    setValue('phones', newPhones);
  };

  const updatePhoneInput = (index: number, value: string) => {
    const newPhones = [...phoneInputs];
    newPhones[index] = value;
    setPhoneInputs(newPhones);
    setValue('phones', newPhones);
  };

  const addAddressInput = () => {
    setAddressInputs([...addressInputs, '']);
    setValue('addresses', [...addressInputs, '']);
  };

  const removeAddressInput = (index: number) => {
    const newAddresses = addressInputs.filter((_, i) => i !== index);
    setAddressInputs(newAddresses);
    setValue('addresses', newAddresses);
  };

  const updateAddressInput = (index: number, value: string) => {
    const newAddresses = [...addressInputs];
    newAddresses[index] = value;
    setAddressInputs(newAddresses);
    setValue('addresses', newAddresses);
  };

  const onSubmit = async (data: DriverRegisterForm) => {
    setLoading(true);
    try {
      // 1. Create auth user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      });
      if (signUpError) throw signUpError;
      if (!user) throw new Error("User not created");

      // 2. Insert into driver table
      const { error: driverError } = await supabase.from('driver').insert({
        email: data.email,
        password: data.password,
        name: data.name,
        dob: data.dob,
        nin: data.nin,
        phone: data.phones,
        address: data.addresses,
        kyc: false,
      });
      if (driverError) throw driverError;

      // 3. Insert into users table with role 'driver'
      const { error: userError } = await supabase.from('users').insert({
        email: data.email,
        name: data.name,
        avatar: null,
        role: 'driver',
      });
      if (userError) throw userError;

      setLoading(false);
      toast.success('Driver Registered Successfully!')
    } catch (err) {
      setLoading(false);
      const message = err instanceof Error ? err.message : 'Registration failed';
      alert(message);
    }
  };

  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <Card className="max-w-md mx-auto py-8 px-6 bg-gray-50 dark:bg-gray-900/90">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">Driver Registration</CardTitle>
        <div className="mt-4">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-center mt-2 text-gray-500">Step {step} of {totalSteps}</p>
        </div>
      </CardHeader>

      <CardContent>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden relative"
          animate={{ height: 'auto' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="space-y-4"
            >
              {step === 1 && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name?.message && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  <Button
                    type="button"
                    className="w-full mt-4 text-gray-200"
                    onClick={() => getValues('name') && setStep(2)}
                  >
                    Next
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email?.message && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => getValues('email') && setStep(3)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register('password')} />
                  {errors.password?.message && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => getValues('password') && setStep(4)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" {...register('dob')} />
                  {errors.dob?.message && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => getValues('dob') && setStep(5)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-2">
                  <Label htmlFor="nin">NIN</Label>
                  <Input id="nin" {...register('nin')} />
                  {errors.nin?.message && <p className="text-red-500 text-sm">{errors.nin.message}</p>}
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(4)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => getValues('nin') && setStep(6)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-2">
                  <Label>Phone Numbers</Label>
                  {phoneInputs.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        id={`phone-${index}`}
                        value={phone}
                        onChange={(e) => updatePhoneInput(index, e.target.value)}
                        placeholder={`Phone number ${index + 1}`}
                      />
                      {phoneInputs.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removePhoneInput(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" onClick={addPhoneInput} className="mt-2 text-gray-200">
                    Add Phone Number
                  </Button>
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(5)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' onClick={() => setStep(7)}>Next</Button>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-2">
                  <Label>Addresses</Label>
                  {addressInputs.map((address, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        id={`address-${index}`}
                        value={address}
                        onChange={(e) => updateAddressInput(index, e.target.value)}
                        placeholder={`Address ${index + 1}`}
                      />
                      {addressInputs.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeAddressInput(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" onClick={addAddressInput} className="mt-2 text-gray-200">
                    Add Address
                  </Button>
                  <div className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(6)}>
                      Back
                    </Button>
                    <Button type="submit" className="text-gray-200" disabled={loading}>
                      {loading ? <Loader /> : 'Submit'}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.form>
      </CardContent>
    </Card>
  );
}