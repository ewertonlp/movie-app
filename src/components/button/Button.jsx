import PropTypes from 'prop-types'

const Button = props => {
  return (
    <button
        className={`btn ${props.className}`}
        onClick={props.OnClick ? () => props.onClick() : null}>
         {props.children}
    </button>
  )
}

const OutlineButton = props => {
    return (
        <Button
        className={`btn-outline ${props.className}`}
        onClick={props.OnClick ? () => props.onClick() : null}>
            {props.children}
        </Button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button;