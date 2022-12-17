import { useAuth } from '../../hooks/useAuth'
import Connect from './Connect'

export default function AuthCheck({
  formUI,
  connectCopy,
}: {
  formUI?: JSX.Element
  connectCopy?: string | JSX.Element
}) {
  const { isConnected } = useAuth()
  return (
    <div className={`ns-surfacePrimary`}>
      {!isConnected ? <Connect connectCopy={connectCopy} /> : formUI}
    </div>
  )
}
