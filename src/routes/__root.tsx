import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Text } from '../components';

function RootLayout() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 w-full h-screen">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-8 w-full p-4 bg-white dark:bg-gray-800 shadow-md">
                <Link to="/">
                    <Text className="text-3xl font-bold text-blue-500 dark:text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        Taska
                    </Text>
                </Link>

                <div className="flex flex-row gap-4">
                    <StyledLink to="/">Home</StyledLink>
                    <StyledLink to="/incomplete">Incomplete</StyledLink>
                    <StyledLink to="/complete">Complete</StyledLink>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-3xl items-center mx-auto px-4 pb-8">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </div>
    );
}

export const Route = createRootRoute({ component: RootLayout });

function StyledLink({ to, children }: { to: string; children: React.ReactNode }) {
    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    const isActive = pathname === to;

    return (
        <Link
            to={to}
            className={[
                isActive
                    ? 'font-bold text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
                'transition-colors duration-200',
            ].join(' ')}
        >
            {children}
        </Link>
    );
}
