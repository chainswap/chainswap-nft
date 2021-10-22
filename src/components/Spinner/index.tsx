import { CircularProgress, makeStyles, createStyles } from '@material-ui/core'

interface Props {
  size?: string | number
  thickness?: number
  color?: string
  marginLeft?: string | number
  marginRight?: string | number
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'relative',
      marginLeft: (props: Props) => props.marginLeft ?? 0,
      marginRight: (props: Props) => props.marginRight ?? 0,
      height: (props: Props) => props.size,
      width: (props: Props) => props.size
    },
    bottom: {
      '& svg circle': {
        stroke: theme.bgColor.bg5
      }
    },
    top: {
      color: (props: Props) => props.color ?? theme.palette.primary.main,
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      top: 0
    }
  })
)

export default function Spinner({ size = 16, thickness = 3, ...props }: Props) {
  const classes = useStyles({ ...props, size })

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        thickness={thickness - 1}
        size={size}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        thickness={thickness}
        size={size}
      />
    </div>
  )
}
