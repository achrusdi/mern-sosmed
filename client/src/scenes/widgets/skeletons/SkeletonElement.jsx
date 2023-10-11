import './skeleton.css';

const SkeletonElement = ({ type, style }) => {
    const classes = `skeleton ${type}`;

    return (
        <div className={classes} style={style}></div>
    );
}

export default SkeletonElement;