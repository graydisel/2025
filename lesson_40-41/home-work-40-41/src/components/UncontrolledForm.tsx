import { useRef, FormEvent } from 'react';

function UncontrolledForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    let users: Array<string | undefined> = [];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        users = [...users, nameRef.current?.value];
        console.log('UncontrolledForm submission:', {
            name: nameRef.current?.value || '',
        });
        console.log('Users', users);
    };

    return (
        <>
            <form>
                <h3>Uncontrolled Form</h3>
                <input type="text" ref={nameRef} placeholder="Your name"/>
                <button type="button" onClick={handleSubmit}>Add User</button>
            </form>
        </>
    );
}

export default UncontrolledForm;