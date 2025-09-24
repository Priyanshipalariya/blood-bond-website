const Button = ({className, children}) => {
  return (
        <button className={`cursor-pointer font-mono text-white bg-red-600 hover:bg-red-700 border-transparent rounded-md px-4 py-1  ${className}`}>{children}</button>
  );
};

const ButtonContrast = ({className, children}) => {
  return (
    <button className={`cursor-pointer font-mono text-red-600 bg-white  hover:text-black hover:bg-transparent border border-red-600 rounded-md px-4 py-1  ${className}`}>{children}</button>
);
}
const ButtonLink = ({className, children}) =>{
    return(
        <button className={`cursor-pointer font-mono text-red-600 text-lg hover:font-bold hover:text-xl hover:text-red-700 hover:underline ${className}`}>{children}</button>
    )

}

export {Button, ButtonContrast, ButtonLink};