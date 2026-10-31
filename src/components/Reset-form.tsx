"use client";

 
import { resetPassword, signIn } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {Suspense, useState} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const Resetform = () => {


     const searchParams = useSearchParams()
  const token =searchParams.get("token")

 
const [isVisible, setIsVisible] = useState(false);
  const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());
    const {data:res}=await resetPassword({
        newPassword:data.password as string,
        token:token as string
    }
    )
     
     
}}

    

 
 
 






    return (
        <div>
        <Form
        className="flex w-96 flex-col gap-4"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={onSubmit}
        >
            
        

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
        </div>
    );
};

export default Resetform;