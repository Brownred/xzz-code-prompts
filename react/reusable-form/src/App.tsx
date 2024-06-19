import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"




/** Components Imports */

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"




//////////////////////////////////////////////////////////////////////////////////////////



const schema  = z.object({

  username: z.string().min(2, {message: "Username must be at least 2 characters."}),
  email: z.string().email({message: 'not a valid email'}),
  password: z.string().min(8, {message: "Username must be at least 2 characters."})

})

type FormFields = z.infer<typeof schema>



const App = () => {

  
  const form = useForm<FormFields>( {resolver: zodResolver(schema), defaultValues: { username: "" },});

  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {

    console.log('clicked')
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md z-10 bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

  }



  return (

    <section className="bg-gradient_morph custom-scrollbar bg-fixed bg-cover bg-no-repeat bg-center h-screen w-screen overflow-x-hidden">
      <div className="container my-20 h-full w-full flex items-center justify-center ">
        <div className="px-10 py-16 w-[600px] rounded-2xl bg-ghostWhite">


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormFieldComponet 
            name="username"
            label="Full Name"
            placeholder="Rick"
            />

            <FormFieldComponet 
            name="email"
            label="email"
            placeholder="rick@xyz.com"
            formDescription="Enter your company email"
            />

            <FormFieldComponet 
            name="password"
            label="password"
            placeholder="**********"
            />

            <FormFieldComponet 
            name="date"
            label="date"
            placeholder=""
            />

            <FormFieldComponet 
            name="gender"
            label="gender"
            placeholder="Male/Female"
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
      </div>

    </section>
  )
}

export default App




//////////////////////////////////////////////////////////////////////////////////////////

// Reusable Components


interface InputField {
  name: string;
  label: string;
  placeholder: string;
  formDescription?: string;
}

const FormFieldComponet = ({name, label, placeholder, formDescription}: InputField ) => {

  const { control } = useFormContext()

  return (
    <FormField control={ control } name={name} render={({ field }) => (
        <FormItem>
          <FormLabel>{ label }</FormLabel>
          <FormControl>
            <Input type={ name } placeholder={ placeholder } {...field} />
          </FormControl>

          {formDescription ? 
            <FormDescription>
              { formDescription }
            </FormDescription> :
          null  
        }
          <FormMessage />
        </FormItem>
      )}
    />
  )
}