import { Fragment } from 'react';
import { connect } from 'react-redux';
import { CheckCircleIcon } from '@heroicons/react/solid';

function Alert({ alert }) {
    const displayAlert = () => {
        if (alert !== null) {
            let bgColor, textColor, iconColor;

            switch (alert.alertType) {
                case 'green':
                    bgColor = 'bg-green-50';
                    textColor = 'text-green-800';
                    iconColor = 'text-green-400';
                    break;
                case 'red':
                    bgColor = 'bg-red-50';
                    textColor = 'text-red-800';
                    iconColor = 'text-red-400';
                    break;
                case 'yellow':
                    bgColor = 'bg-yellow-50';
                    textColor = 'text-yellow-800';
                    iconColor = 'text-yellow-400';
                    break;
                case 'blue':
                    bgColor = 'bg-blue-50';
                    textColor = 'text-blue-800';
                    iconColor = 'text-blue-400';
                    break;
                default:
                    bgColor = 'bg-gray-50';
                    textColor = 'text-gray-800';
                    iconColor = 'text-gray-400';
            }

            return (
                <div className={`rounded-md ${bgColor} p-4`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm font-medium ${textColor}`}>{alert.msg}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Fragment></Fragment>;
        }
    };

    return <Fragment>{displayAlert()}</Fragment>;
}

const mapStateToProps = (state) => ({
    alert: state.Alert.alert,
});

export default connect(mapStateToProps)(Alert);
