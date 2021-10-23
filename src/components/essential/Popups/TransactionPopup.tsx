import { AlertCircle, CheckCircle } from 'react-feather'
import { Typography, useTheme, Box } from '@material-ui/core'
import { useActiveWeb3React } from 'hooks/'
import { ExternalLink } from 'theme/components'
import { getEtherscanLink } from 'utils'
import { AutoColumn } from 'components/Column'

export default function TransactionPopup({
  hash,
  success,
  summary
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveWeb3React()

  const theme = useTheme()

  return (
    <AutoColumn gap="8px">
      <Box display="flex" alignItems="flex-start" flexWrap="nowrap">
        <div style={{ paddingRight: 16 }}>
          {success ? (
            <CheckCircle color={theme.palette.success.main} size={24} />
          ) : (
            <AlertCircle color={theme.palette.error.main} size={24} />
          )}
        </div>
        <Typography>{summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}</Typography>{' '}
      </Box>
      {chainId && (
        <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')} style={{ margin: '9px 32px' }}>
          View on Etherscan
        </ExternalLink>
      )}
    </AutoColumn>
  )
}