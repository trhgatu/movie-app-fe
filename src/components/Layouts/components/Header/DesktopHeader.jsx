import * as React from "react"
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle"
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const DesktopHeader = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
    return (
        <div className="hidden lg:flex justify-between items-center">
            <div className="text-2xl font-bold  flex-shrink-0">
                <Link to="/" className=" hover:text-red-500 dark:text-white">
                    MovieS
                </Link>
            </div>
            <nav className="flex-grow flex justify-center space-x-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="hover:bg-gray-200 dark:hover:text-white dark:bg-white focus:bg-gray-100 transition-all duration-300 rounded-md">
                                <p className="scroll-m-20 dark:text-black text-base font-semibold tracking-tight hover:text-red-500">Phim</p>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="p-2 shadow-lg w-[250px] bg-white">
                                <div className="space-y-2 w-32">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/movies/new"
                                            className="block text-base hover:bg-gray-200  p-2 rounded-md transition-colors duration-200"
                                        >
                                            Phim mới
                                        </Link>
                                    </NavigationMenuLink>

                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/movies/series"
                                            className="block  hover:bg-gray-200 p-2 rounded-md transition-colors duration-200"
                                        >
                                            Phim bộ
                                        </Link>
                                    </NavigationMenuLink>

                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/movies/single"
                                            className="block  hover:bg-gray-200 p-2 rounded-md transition-colors duration-200"
                                        >
                                            Phim lẻ
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <DarkModeToggle onClick={() => setIsDarkMode(!isDarkMode)} />
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="px-4 py-2 rounded-full border-2 border-gray-300 text-black"
                    placeholder="Tìm phim..."
                />
                <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-4 py-1 rounded-full"
                >
                    <AiOutlineSearch />
                </Button>
            </form>
        </div>
    )
}

export default DesktopHeader
