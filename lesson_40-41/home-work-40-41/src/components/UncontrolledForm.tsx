import { useRef, FormEvent } from 'react';

function UncontrolledForm() {
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('UncontrolledForm submission:', {
            name: nameRef.current?.value || '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Неконтрольована форма</h3>
            <input type="text" ref={nameRef} placeholder="Ваше ім'я" />
            <button type="submit">Надіслати</button>
        </form>
    );
}

export default UncontrolledForm;