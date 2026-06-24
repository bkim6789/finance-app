export const Welcome = ({
  firstName='default first',
  lastName='default last name',
}) => {
  return (
    <div>
      first: {firstName}, last: {lastName}
    </div>
  )
};