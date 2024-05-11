// Copyright (C) 2024 lucas
// 
// This file is part of diet-gem.
// 
// diet-gem is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// diet-gem is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with diet-gem.  If not, see <https://www.gnu.org/licenses/>.

import Image from 'next/image';

export default function Header() {
    return (
        <header className="flex items-center justify-center bg-gray-100 py-4 w-full">
            <div className="flex items-center">
                {/* Adjust image source and alt text as needed */}
                <Image src="/vercel.svg" alt="DietGem Logo" width={40} height={40} />
                <span className="ml-2 text-xl font-bold text-gray-800">DietGem</span>
            </div>
        </header>
    );
}
