import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export default function Offline() {
  const { t } = useTranslation();
  const [status, setStatus] = useState(true);

  const changeStatus = useCallback(() => {
    if (navigator.onLine && !status) {
      confirm(t('messages.go_back_online'));
      window.location.reload();
    }
    setStatus(navigator.onLine);
  }, [status, t]);

  useEffect(() => {
    window.addEventListener('online', changeStatus);
    window.addEventListener('offline', changeStatus);
    return () => {
      window.removeEventListener('online', changeStatus);
      window.removeEventListener('offline', changeStatus);
    };
  }, [changeStatus]);

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 rounded-full border p-2 border-gray-400',
        {
          'opacity-0 pointer-events-none': status,
        },
      )}
    >
      <Icon icon="tabler:wifi-off" className="text-gray-600 text-xl" />
    </div>
  );
}
