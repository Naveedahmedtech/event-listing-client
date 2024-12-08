import Button from '@/atoms/Button';
import { useRouter } from 'next/navigation';

interface ActionGroupProps {
    setIsMenuOpen?: (menu: boolean) => void; // Optional callback to set menu state
}

const ActionGroup: React.FC<ActionGroupProps> = ({ setIsMenuOpen }) => {
    const router = useRouter();
    const handleButtonClick = (route: string) => {
        if (setIsMenuOpen) {
            setIsMenuOpen(false);
        }
        router.push(route)
    };



    return (
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <Button className="px-6 py-3" onClick={() => handleButtonClick("/auth/signin")}>
                Login
            </Button>
            <Button variant="primary" className="px-6 py-3" onClick={() => handleButtonClick("/auth/registration")}>
                Sign Up
            </Button>
        </div>
    );
};

export default ActionGroup;
