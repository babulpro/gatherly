"use client";

 
import { signIn } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {useState} from "react";
import Link from "next/link";



export default function SignInPage() {
 const [isVisible, setIsVisible] = useState(false);
  const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());

    const {data:response,error}=await signIn.email({
        email:data.email as string, 
        password:data.password as string,
         rememberMe: true,  
         callbackURL:"/"
    })

    
    

  };

  const singUPGoogleHandler= async()=>{
    const data = await signIn.social({
    provider: "google",
  });

     
  }
 

  
  const singUpFacebook= async()=>{
    const data= await signIn.social({
          provider: "facebook"
    })

    
     
  }

  return (
    <div>
    <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
         
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
         
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    <Link href={"/forgot-password"}>Forgot Passwod</Link>
    <br/>
     
    <Button onClick={singUPGoogleHandler}>Sign In With Google</Button>
   
     
    <Button onClick={singUpFacebook}>Sign In With Facebook</Button>
    </div>
    
  );
}