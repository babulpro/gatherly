"use client";

import { changePassword, signUp, updateUser } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {useState} from "react";
 ;
 


export default function ProfilePage() {
  const [isVisible, setIsVisible] = useState(false);


  const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());
    await updateUser({
        name:data.name as string
    })
    
        

    
  };


  const onSubmitPassword =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());
    await changePassword({
        newPassword:data.newpassword as string,
        currentPassword:data.previouspassword as string,
        revokeOtherSessions:true
    })
    
      
     

    
  };

  return (

    <div>
    <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
        <div>

            <TextField
                isRequired
                name="name"
                validate={(value) => {
                if (value.length < 3) {
                    return "Name must be at least 3 characters";
                }
                return null;
                }}
            >
                <Label>Name</Label>
                <Input placeholder="John Doe" />
                <FieldError />
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
        
        </div>
       

    </Form>
    <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmitPassword}
    >
        <div>

            <TextField
                isRequired
                name="previouspassword"
                validate={(value) => {
                if (value.length < 3) {
                    return "Name must be at least 3 characters";
                }
                return null;
                }}
            >
                <Label>Password</Label>
                <Input placeholder="Previous Password" />
                <FieldError />
            </TextField>
            <TextField
                isRequired
                name="newpassword"
                validate={(value) => {
                if (value.length < 3) {
                    return "Name must be at least 3 characters";
                }
                return null;
                }}
            >
                <Label>Password</Label>
                <Input placeholder="New Password" />
                <FieldError />
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
        
        </div>
       

    </Form>

    </div>
  );
}