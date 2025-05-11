import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faList } from '@fortawesome/free-solid-svg-icons';
import type { LayoutView } from '@/types';

interface ControlsProps {
    currentLayout: LayoutView;
    onLayoutChange: (layout: LayoutView) => void;
}

const Controls: React.FC<ControlsProps> = ({ currentLayout, onLayoutChange }) => {
    return (
        <section className="mb-6 md:mb-8 bg-white rounded-lg shadow-sm p-3 sm:p-4" >
            <div className="flex justify-start items-center" >
                < div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1" >
                    <button
                        onClick={() => onLayoutChange('grid')}
                        className={`p-2 rounded-md focus:outline-none ${currentLayout === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'} cursor-pointer`
                        }
                        title="Grid View"
                        aria-pressed={currentLayout === 'grid'}>
                        <FontAwesomeIcon icon={faThLarge} />
                    </button>
                    < button
                        onClick={() => onLayoutChange('table')}
                        className={`p-2 rounded-md focus:outline-none ${currentLayout === 'table' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'} cursor-pointer`}
                        title="Table View"
                        aria-pressed={currentLayout === 'table'}
                    >
                        <FontAwesomeIcon icon={faList} />
                    </button>
                </div>
            </div >
        </section >
    );
};

export default Controls;