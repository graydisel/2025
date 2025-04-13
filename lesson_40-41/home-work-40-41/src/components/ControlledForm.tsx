import { useState, ChangeEvent, FormEvent } from 'react';

interface FormState {
    name: string;
    subscribed: boolean;
}

function ControlledForm() {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        subscribed: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));
    };


    return (
        <form>
            <h3>Controlled form</h3>
            <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
            />
            <label>
                <input
                    type="checkbox"
                    name="subscribed"
                    checked={formData.subscribed}
                    onChange={handleChange}
                />
                Subscription
            </label>
            <div>
                <p>Your entered name: {formData.name}</p>
                {(formData.subscribed) ? (<p>Yes</p>) : (<p>No</p>)}
            </div>
        </form>
    );
}

export default ControlledForm;