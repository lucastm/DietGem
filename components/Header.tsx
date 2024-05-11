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
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-center bg-gray-100 py-4 w-full">
            <div className="flex items-center">
                {/* Adjust image source and alt text as needed */}
                <Image src="/logo.png" alt="DietGem Logo" width={40} height={40} />
                <span className="ml-2 text-xl font-bold text-gray-800">DietGem</span>
            </div>
            {/* Botão de votação */}
            <div>
                <Link href="https://discord.com/channels/1228404913705451612/1228406162618060913/1238849735654379645" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" rel="noopener noreferrer">
                        Vote no DietGem no Discord 🚀
                    </button>
                </Link>
            </div >
        </header >
    );
}
