import { useEffect, useState } from 'react'
import classes from './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import axios, { Axios } from 'axios'

export default function Home() {
  return (
    <>
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
    </>
  )
}
