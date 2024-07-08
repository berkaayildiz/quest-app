import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import './PostForm.css';


type PostFormProps = {
    refreshPosts: () => void;
};

const PostForm: React.FC<PostFormProps> = ({ refreshPosts }: PostFormProps) => {

    let userId = 1;
    let username = "berkaayildiz";

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = () => {
        // Save post to database
        savePost();
        // Make sure the post is shown without refreshing the page
        refreshPosts();
        // Animate button press
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
        // Clear input fields
        setTitle('');
        setDescription('');
    };

    const savePost = () => {
        fetch('/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                title: title,
                text: description,
            }),
        })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Card className="w-full max-w-4xl rounded-lg m-6">
            <CardHeader className="flex items-center gap-4 p-4">
                <Link to={'/users/' + userId}>
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="text-sm">{username}</div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1 text-left ml-2">Title</label>
                    <Input id="title" placeholder="Enter title" maxLength={25} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1 text-left ml-2">Description</label>
                    <Input id="description" placeholder="Enter description" maxLength={250} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <Button className={isAnimating ? 'animate-press' : ''} color="primary" onClick={handleSubmit}>Save</Button>
            </CardContent>
        </Card>
    )
}
export default PostForm;
