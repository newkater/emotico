import { getProfile } from '@/lib/getProfile'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile',
}

const Profile = async () => {
    const profileData: Promise<User> = getProfile(1);

    const user = await profileData;

    return (
        <div>
            <h3>Profile</h3>
            <ul>
                <li>{user.id}</li>
                <li>{user.name}</li>
                <li>{user.username}</li>
                <li>{user.email}</li>
            </ul>

        </div>
    )
}

export default Profile