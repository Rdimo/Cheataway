import { getDiscordInvite } from '@/components/invite'

const Invite = () => {
    console.log('Redirecting..')
    window.location.href = getDiscordInvite(true)
    return null
}
export default Invite
