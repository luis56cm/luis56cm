export const Alert = ({ variant, children }) => {
    const styles = variant === 'destructive' 
      ? 'bg-red-500 text-white p-4 rounded-md' 
      : 'bg-green-500 text-white p-4 rounded-md';
  
    return <div className={styles}>{children}</div>;
  };
  
  export const AlertTitle = ({ children }) => (
    <strong className="font-bold">{children}</strong>
  );
  