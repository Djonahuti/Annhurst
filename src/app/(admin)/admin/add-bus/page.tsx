'use client'
import { useEffect, useState } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from '@/components/Loader'
import { Progress } from '@/components/ui/progress'

interface Driver {
  id: number;
  name: string | null;
  email: string | null;
}

interface Coordinator {
  id: number;
  name: string;
  email: string;
}

export default function AddBusPage() {
  const { supabase } = useSupabase()

  const [drivers, setDrivers] = useState<Driver[]>([])
  const [coordinators, setCoordinators] = useState<Coordinator[]>([])

  const [step, setStep] = useState(1)

  // form state
  const [busCode, setBusCode] = useState('')
  const [plateNo, setPlateNo] = useState('')
  const [driverId, setDriverId] = useState('')
  const [coordinatorId, setCoordinatorId] = useState('')
  const [letterIssued, setLetterIssued] = useState<boolean | null>(null)
  const [expectedPayment, setExpectedPayment] = useState('')
  const [contractDate, setContractDate] = useState('')
  const [agreedDate, setAgreedDate] = useState('')
  const [dateCollected, setDateCollected] = useState('')
  const [startDate, setStartDate] = useState('')
  const [firstPay, setFirstPay] = useState('')
  const [initialOwe, setInitialOwe] = useState('')
  const [deposited, setDeposited] = useState('')
  const [tIncome, setTIncome] = useState('')
  const [loading, setLoading] = useState(false)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100  

  useEffect(() => {
    const fetchData = async () => {
      const { data: driverData } = await supabase.from('driver').select('id, name, email')
      const { data: coordinatorData } = await supabase.from('coordinators').select('id, name, email')

      if (driverData) setDrivers(driverData)
      if (coordinatorData) setCoordinators(coordinatorData)
    }
    fetchData()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('buses').insert([
      {
        bus_code: busCode,
        plate_no: plateNo,
        driver: driverId,
        coordinator: coordinatorId,
        letter: letterIssued,
        e_payment: expectedPayment ? Number(expectedPayment) : null,
        contract_date: contractDate || null,
        agreed_date: agreedDate || null,
        date_collected: dateCollected || null,
        start_date: startDate || null,
        first_pay: firstPay || null,
        initial_owe: initialOwe ? Number(initialOwe) : null,
        deposited: deposited ? Number(deposited) : null,
        t_income: tIncome ? Number(tIncome) : null,
      }
    ])

    setLoading(false)

    if (error) {
      toast('Error adding bus', { description: error.message, className: 'destructive' })
    } else {
      toast(
        <div className='text-sm'>
            <strong>Bus added successfully</strong>
        </div>
      )
      // reset form
      setBusCode('')
      setPlateNo('')
      setDriverId('')
      setCoordinatorId('')
      setLetterIssued(null)
      setExpectedPayment('')
      setContractDate('')
      setAgreedDate('')
      setDateCollected('')
      setStartDate('')
      setFirstPay('')
      setInitialOwe('')
      setDeposited('')
      setTIncome('')
      setStep(1)
    }
  }

  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <Card className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 shadow-lg rounded-2xl">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl font-bold">Add New Bus</CardTitle>
        <div className="mt-4">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-gray-500 mt-2">Step {step} of {totalSteps}</p>
        </div>
      </CardHeader>

      <CardContent>
        <motion.form
          onSubmit={handleSubmit}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
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
              {/* STEP 1: Basic Info */}
              {step === 1 && (
                <>
                  <div className='space-y-2'>
                    <Label>Bus Code</Label>
                    <Input value={busCode} onChange={(e) => setBusCode(e.target.value)} required />
                  </div>
                  <div className='space-y-2'>
                    <Label>Plate Number</Label>
                    <Input value={plateNo} onChange={(e) => setPlateNo(e.target.value)} required />
                  </div>
                  <Button
                    type="button"
                    className="w-full mt-4 text-gray-200"
                    onClick={() => busCode && plateNo && setStep(2)}
                  >
                    Next
                  </Button>
                </>
              )}

              {/* STEP 2: Assign Driver/Coordinator */}
              {step === 2 && (
                <>
                  <div className='space-y-2'>
                    <Label>Assign Driver</Label>
                    <Select value={driverId} onValueChange={setDriverId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map((d) => (
                          <SelectItem key={d.id} value={d.id.toString()}>
                            {d.name} ({d.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Assign Coordinator</Label>
                    <Select value={coordinatorId} onValueChange={setCoordinatorId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select coordinator" />
                      </SelectTrigger>
                      <SelectContent>
                        {coordinators.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name} ({c.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" type="button" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => driverId && coordinatorId && setStep(3)}>
                      Next
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 3: Payment Info */}
              {step === 3 && (
                <>
                  <div className='space-y-2'>
                    <Label>Letter Issued</Label>
                    <Select onValueChange={(val) => setLetterIssued(val === 'true')} value={letterIssued?.toString() || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Expected Payment</Label>
                    <Input type="number" value={expectedPayment} onChange={(e) => setExpectedPayment(e.target.value)} />
                  </div>
                  <div>
                    <Label>Contract Date</Label>
                    <Input type="date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" type="button" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className='text-gray-200' type="button" onClick={() => setStep(4)}>
                      Next
                    </Button>
                  </div>
                </>
              )}

              {/* STEP 4: Final Details */}
              {step === 4 && (
                <>
                  <div className='space-y-2'>
                    <Label>Agreed Completion Date</Label>
                    <Input type="date" value={agreedDate} onChange={(e) => setAgreedDate(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Date Collected</Label>
                    <Input type="date" value={dateCollected} onChange={(e) => setDateCollected(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Start Date</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>First Payment Date</Label>
                    <Input type="date" value={firstPay} onChange={(e) => setFirstPay(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Initial Amount Owed</Label>
                    <Input type="number" value={initialOwe} onChange={(e) => setInitialOwe(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Deposited</Label>
                    <Input type="number" value={deposited} onChange={(e) => setDeposited(e.target.value)} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Total Income</Label>
                    <Input type="number" value={tIncome} onChange={(e) => setTIncome(e.target.value)} />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" type="button" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button type="submit" className="w-full text-gray-200" disabled={loading}>
                      {loading ? <Loader /> : 'Add Bus'}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.form>
      </CardContent>
    </Card>
  )
}
