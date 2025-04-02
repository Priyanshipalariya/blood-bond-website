const Button = ({className, children}) => {
  return (
        <button className={`cursor-pointer font-mono text-white bg-red-600 hover:bg-red-700 border-transparent rounded-xl px-4 py-1  ${className}`}>{children}</button>
  );
};

const ButtonLink = ({className, children}) =>{
    return(
        <button className={`cursor-pointer font-mono text-red-600 text-lg hover:font-bold hover:text-xl hover:text-red-700 hover:underline ${className}`}>{children}</button>
    )

}

export {Button, ButtonLink};