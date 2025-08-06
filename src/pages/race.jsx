export default function Race ({ text, ClassName = ''}) {
      
    let className = '';
  
    if (text.includes("terran") || text.includes("T")|| text.includes("t")) {
      className = 'terran';
    } else if (text.includes("zerg")|| text.includes("Z") || text.includes("z")) {
      className = 'zerg';
    } else if (text.includes("protoss")|| text.includes("P") || text.includes("p")) {
      className = 'protoss';
    }
    else className = 'unknown'
  return (
    <div className={`race-container ${ClassName}`}>
<p className={className}>{text}</p>
<p className="race-full-text">{className}</p>
    </div>
  );
};