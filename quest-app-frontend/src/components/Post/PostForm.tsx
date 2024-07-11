import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { PostFormProps } from '@/types/props/PostFormProps';
import { FormFieldProps } from '@/types/props/FormFieldProps';

import './PostForm.css';
import { AuthUser } from '@/types/AuthUser';


const PostForm: FC<PostFormProps> = ({ refreshPosts }) =>
{
  // Holds the state of the title and description input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Holds the state of the animation of the button press
  const [isAnimating, setIsAnimating] = useState(false);
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');


  // Handles the submit button press
  const handleSubmit = () => {
    // Save post to database and refresh posts to display the new post
    savePost().then(() => refreshPosts());
    // Animate button press
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    // Clear input fields
    setTitle('');
    setDescription('');
  };

  // Save post to database
  const savePost = async () => {
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authUser.token,
          },
          body: JSON.stringify({
            userId: authUser.id,
            title: title,
            text: description,
          }),
      });
      await response.json();
    } catch (error) { console.error('Error:', error); }
  };

  
  // Displays a form with an avatar, input fields, and submit button to add a post
  return (
    <Card className="w-full max-w-4xl rounded-lg m-2 mt-6">
      <CardHeader className="flex items-center gap-4 p-4">
        <Link to={`/users/${authUser.id}`}>
          <Avatar>
            <AvatarFallback>{authUser.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="text-sm">{authUser.username}</div>
      </CardHeader>
      <CardContent className="p-4">
        <FormField
          id="title"
          label="Title"
          placeholder="Enter title"
          maxLength={25}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          id="description"
          label="Description"
          placeholder="Enter description"
          maxLength={250}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center">
          <Button className={isAnimating ? 'animate-press' : ''} color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
  
// Form field component
const FormField: FC<FormFieldProps> = ({ id, label, placeholder, maxLength, value, onChange }) =>
(
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1 text-left ml-2">
        {label}
    </label>
    <Input id={id} placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange} />
  </div>
);

export default PostForm;
