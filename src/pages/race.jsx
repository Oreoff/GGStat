export default function Race ({ text}) {
      
    let className = '';
  
    if (text.includes("terran") || text.includes("T")) {
      className = 'terran';
    } else if (text.includes("zerg")|| text.includes("Z")) {
      className = 'zerg';
    } else if (text.includes("protoss")|| text.includes("P")) {
      className = 'protoss';
    }
  

  return (
    <p className={className}>{text} </p>
  );
};