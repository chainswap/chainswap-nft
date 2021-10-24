import { styled, Theme } from '@material-ui/core'
import { useActivePopups } from 'state/application/hooks'
import PopupItem from './PopupItem'

const MobilePopupWrapper = styled('div')(({ height, theme }: { height: string | number; theme: Theme }) => ({
  position: 'relative',
  maxWidth: '100%',
  height: height,
  margin: height ? '0 auto;' : 0,
  marginBottom: height ? '20px' : 0,
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}))

const MobilePopupInner = styled('div')({
  height: '99%',
  overflowX: 'auto',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  '-webkit-overflow-scrolling': 'touch',
  '& ::-webkit-scrollbar': {
    display: 'none'
  }
})

const FixedPopupColumn = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 38,
  right: 16,
  maxWidth: 340,
  width: '100%',
  zIndex: 3,
  display: 'grid',
  gridRowGap: 20,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups()

  return (
    <>
      <FixedPopupColumn>
        {activePopups.map(item => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
      </FixedPopupColumn>
      <MobilePopupWrapper height={activePopups?.length > 0 ? 'fit-content' : 0}>
        <MobilePopupInner>
          {activePopups // reverse so new items up front
            .slice(0)
            .reverse()
            .map(item => (
              <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
            ))}
        </MobilePopupInner>
      </MobilePopupWrapper>
    </>
  )
}
