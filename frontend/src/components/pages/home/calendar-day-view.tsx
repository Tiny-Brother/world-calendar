import { hours } from '@/lib/utils';

const morning = 'AM';
const afternoon = 'PM';

export function CalendarDayView() {
  return (
    <div className="flex h-full flex-col">
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div className="no-scrollbar flex flex-auto flex-col overflow-auto">
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(24, minmax(3.5rem, 1fr))' }}
              >
                <div className="row-end-1 h-7" />

                {hours.map((hour, index) => {
                  const suffix = index > 11 ? afternoon : morning;

                  return (
                    <div key={`${hour}+${suffix}`}>
                      <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {hour}
                        {suffix}
                      </div>
                    </div>
                  );
                })}
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
